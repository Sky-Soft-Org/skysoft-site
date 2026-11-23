import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext.jsx';

const MAP_W = 950;
const MAP_H = 620;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.35;

// Positions on the world map. Counts sum to 60,000.
const REGIONS = [
  {
    id: 'levant',
    x: 568, y: 195,
    labelX: 700, labelY: 78,
    count: '21,000',
    name: 'map.levant',
  },
  {
    id: 'gulf',
    x: 608, y: 235,
    labelX: 800, labelY: 210,
    count: '17,500',
    name: 'map.gulf',
  },
  {
    id: 'egypt',
    x: 555, y: 220,
    labelX: 330, labelY: 310,
    count: '9,000',
    name: 'map.egypt',
  },
  {
    id: 'maghreb',
    x: 478, y: 210,
    labelX: 160, labelY: 140,
    count: '5,000',
    name: 'map.maghreb',
  },
  {
    id: 'europe',
    x: 500, y: 145,
    labelX: 380, labelY: 55,
    count: '4,000',
    name: 'map.europe',
  },
  {
    id: 'asia',
    x: 720, y: 245,
    labelX: 850, labelY: 380,
    count: '3,500',
    name: 'map.asia',
  },
];

function calloutPath(cx, cy, lx, ly) {
  const mx = (cx + lx) / 2;
  const my = (cy + ly) / 2;
  const dx = lx - cx;
  const dy = ly - cy;
  const len = Math.hypot(dx, dy) || 1;
  const bend = Math.min(52, len * 0.2);
  const qx = mx + (-dy / len) * bend;
  const qy = my + (dx / len) * bend;
  return `M${cx} ${cy} Q${qx} ${qy} ${lx} ${ly}`;
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function clampPan(x, y, zoom, w, h) {
  const maxX = ((zoom - 1) * w) / 2 + w * 0.15;
  const maxY = ((zoom - 1) * h) / 2 + h * 0.15;
  return {
    x: clamp(x, -maxX, maxX),
    y: clamp(y, -maxY, maxY),
  };
}

export default function ClientsMap() {
  const { t, lang } = useLang();
  const frameRef = useRef(null);
  const viewRef = useRef({ x: 0, y: 0, zoom: 1 });
  const dragRef = useRef(null);
  const pinchRef = useRef(null);
  const [view, setView] = useState({ x: 0, y: 0, zoom: 1 });
  const [dragging, setDragging] = useState(false);

  const applyView = useCallback((next) => {
    const frame = frameRef.current;
    if (!frame) {
      viewRef.current = next;
      setView(next);
      return;
    }
    const { width: w, height: h } = frame.getBoundingClientRect();
    const pan = clampPan(next.x, next.y, next.zoom, w, h);
    const clamped = { ...pan, zoom: clamp(next.zoom, MIN_ZOOM, MAX_ZOOM) };
    viewRef.current = clamped;
    setView(clamped);
  }, []);

  const zoomAt = useCallback((clientX, clientY, nextZoom) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const { x, y, zoom } = viewRef.current;
    const z = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
    if (z === zoom) return;

    const px = clientX - rect.left - rect.width / 2;
    const py = clientY - rect.top - rect.height / 2;
    const ratio = z / zoom;
    applyView({
      zoom: z,
      x: px - (px - x) * ratio,
      y: py - (py - y) * ratio,
    });
  }, [applyView]);

  const bumpZoom = useCallback((dir) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    zoomAt(cx, cy, viewRef.current.zoom + dir * ZOOM_STEP);
  }, [zoomAt]);

  const resetView = useCallback(() => {
    applyView({ x: 0, y: 0, zoom: 1 });
  }, [applyView]);

  // Wheel zoom (non-passive so we can prevent page scroll over the map)
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const onWheel = (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      zoomAt(e.clientX, e.clientY, viewRef.current.zoom * factor);
    };

    frame.addEventListener('wheel', onWheel, { passive: false });
    return () => frame.removeEventListener('wheel', onWheel);
  }, [zoomAt]);

  const onPointerDown = (e) => {
    if (e.pointerType === 'touch' && e.currentTarget.setPointerCapture) {
      // multi-touch handled separately via touch events
    }
    if (pinchRef.current) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragRef.current = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      ox: viewRef.current.x,
      oy: viewRef.current.y,
    };
    setDragging(true);
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId || pinchRef.current) return;
    applyView({
      zoom: viewRef.current.zoom,
      x: drag.ox + (e.clientX - drag.x),
      y: drag.oy + (e.clientY - drag.y),
    });
  };

  const endDrag = (e) => {
    if (dragRef.current?.id === e.pointerId) {
      dragRef.current = null;
      setDragging(false);
    }
  };

  // Pinch-to-zoom
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const onTouchStart = (e) => {
      if (e.touches.length !== 2) return;
      dragRef.current = null;
      setDragging(false);
      const [a, b] = e.touches;
      pinchRef.current = {
        dist: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
        zoom: viewRef.current.zoom,
        mx: (a.clientX + b.clientX) / 2,
        my: (a.clientY + b.clientY) / 2,
        ox: viewRef.current.x,
        oy: viewRef.current.y,
      };
    };

    const onTouchMove = (e) => {
      const pinch = pinchRef.current;
      if (!pinch || e.touches.length !== 2) return;
      e.preventDefault();
      const [a, b] = e.touches;
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const mx = (a.clientX + b.clientX) / 2;
      const my = (a.clientY + b.clientY) / 2;
      const nextZoom = pinch.zoom * (dist / (pinch.dist || 1));
      // pan with midpoint drift + zoom-around midpoint
      const rect = frame.getBoundingClientRect();
      const px = pinch.mx - rect.left - rect.width / 2;
      const py = pinch.my - rect.top - rect.height / 2;
      const z = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
      const ratio = z / pinch.zoom;
      applyView({
        zoom: z,
        x: px - (px - pinch.ox) * ratio + (mx - pinch.mx),
        y: py - (py - pinch.oy) * ratio + (my - pinch.my),
      });
    };

    const onTouchEnd = (e) => {
      if (e.touches.length < 2) pinchRef.current = null;
    };

    frame.addEventListener('touchstart', onTouchStart, { passive: true });
    frame.addEventListener('touchmove', onTouchMove, { passive: false });
    frame.addEventListener('touchend', onTouchEnd);
    frame.addEventListener('touchcancel', onTouchEnd);
    return () => {
      frame.removeEventListener('touchstart', onTouchStart);
      frame.removeEventListener('touchmove', onTouchMove);
      frame.removeEventListener('touchend', onTouchEnd);
      frame.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [applyView]);

  // Keep pan valid on resize
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      const v = viewRef.current;
      applyView(v);
    });
    ro.observe(frame);
    return () => ro.disconnect();
  }, [applyView]);

  const { x, y, zoom } = view;
  const canZoomIn = zoom < MAX_ZOOM - 0.01;
  const canZoomOut = zoom > MIN_ZOOM + 0.01;
  const canReset = zoom !== 1 || x !== 0 || y !== 0;

  return (
    <section className="section clients-map" id="reach" aria-labelledby="map-title">
      <div className="container">
        <header className="section-head">
          <h2 id="map-title">{t('map.title')}</h2>
          <p className="sub">{t('map.sub')}</p>
        </header>

        <div
          className={`world-frame${dragging ? ' is-dragging' : ''}`}
          ref={frameRef}
          role="application"
          aria-label={t('map.aria')}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDoubleClick={(e) => {
            if (viewRef.current.zoom > 1.2) resetView();
            else zoomAt(e.clientX, e.clientY, 2.2);
          }}
          onKeyDown={(e) => {
            if (e.key === '+' || e.key === '=') bumpZoom(1);
            if (e.key === '-' || e.key === '_') bumpZoom(-1);
            if (e.key === '0') resetView();
            if (e.key === 'ArrowLeft') applyView({ ...viewRef.current, x: viewRef.current.x + 40 });
            if (e.key === 'ArrowRight') applyView({ ...viewRef.current, x: viewRef.current.x - 40 });
            if (e.key === 'ArrowUp') applyView({ ...viewRef.current, y: viewRef.current.y + 40 });
            if (e.key === 'ArrowDown') applyView({ ...viewRef.current, y: viewRef.current.y - 40 });
          }}
        >
          <div
            className="world-stage"
            style={{ transform: `translate(${x}px, ${y}px) scale(${zoom})` }}
          >
            <img
              className="world-basemap"
              src="/world-map.svg"
              alt=""
              width={MAP_W}
              height={MAP_H}
              decoding="async"
              draggable={false}
            />

            <svg className="world-overlay" viewBox={`0 0 ${MAP_W} ${MAP_H}`} aria-hidden="true">
              <defs>
                <marker
                  id="arrowHead"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M0 1.5L9 5L0 8.5z" className="world-arrow-head" />
                </marker>
              </defs>

              <g className="world-arrows" fill="none">
                {REGIONS.map((r, i) => (
                  <path
                    key={`a-${r.id}`}
                    className="world-arrow"
                    style={{ animationDelay: `${0.12 * i}s` }}
                    d={calloutPath(r.x, r.y, r.labelX, r.labelY)}
                    markerEnd="url(#arrowHead)"
                  />
                ))}
              </g>

              {REGIONS.map((r, i) => (
                <g key={`p-${r.id}`} className="world-pin" transform={`translate(${r.x} ${r.y})`}>
                  <circle
                    className="world-pin-ring"
                    r="12"
                    style={{ animationDelay: `${0.18 * i}s` }}
                  />
                  <circle className="world-pin-dot" r="4.5" />
                </g>
              ))}

              {REGIONS.map((r) => (
                <g
                  key={`l-${r.id}`}
                  className="world-label"
                  transform={`translate(${r.labelX} ${r.labelY})`}
                >
                  <rect className="world-label-bg" x="-52" y="-26" width="104" height="52" rx="6" />
                  <text className="world-label-count num" textAnchor="middle" y="0">
                    {r.count}
                  </text>
                  <text
                    className="world-label-name"
                    textAnchor="middle"
                    y="18"
                    direction={lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {t(r.name)}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div
            className="world-controls"
            role="group"
            aria-label={t('map.controls')}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="world-ctrl"
              onClick={() => bumpZoom(1)}
              disabled={!canZoomIn}
              aria-label={t('map.zoomIn')}
            >
              <span aria-hidden="true">+</span>
            </button>
            <button
              type="button"
              className="world-ctrl"
              onClick={() => bumpZoom(-1)}
              disabled={!canZoomOut}
              aria-label={t('map.zoomOut')}
            >
              <span aria-hidden="true">−</span>
            </button>
            <button
              type="button"
              className="world-ctrl"
              onClick={resetView}
              disabled={!canReset}
              aria-label={t('map.reset')}
            >
              <span aria-hidden="true">⟲</span>
            </button>
          </div>

          <p className="world-hint">{t('map.hint')}</p>
        </div>

        <p className="map-total">
          <span className="num">+60,000</span>
          <span>{t('map.total')}</span>
        </p>
      </div>
    </section>
  );
}
