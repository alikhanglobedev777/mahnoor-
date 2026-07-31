import { useEffect } from 'react';

export default function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;';
    document.body.appendChild(container);

    const main = document.createElement('div');
    main.style.cssText = 'position:fixed;width:14px;height:14px;border-radius:50%;background:radial-gradient(circle,#ff9bb3,#e0a96d);pointer-events:none;z-index:9999;transition:transform 0.1s ease-out;mix-blend-mode:screen;';
    container.appendChild(main);

    const ring = document.createElement('div');
    ring.style.cssText = 'position:fixed;width:40px;height:40px;border-radius:50%;border:1.5px solid rgba(255,155,179,0.5);pointer-events:none;z-index:9998;transition:transform 0.2s ease-out;';
    container.appendChild(ring);

    const dots: HTMLDivElement[] = [];
    const positions = Array(8).fill({ x: 0, y: 0 });
    for (let i = 0; i < 8; i++) {
      const t = document.createElement('div');
      const size = 6 - i * 0.5;
      t.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,200,220,${0.4 - i * 0.04});pointer-events:none;z-index:9997;`;
      container.appendChild(t);
      dots.push(t);
    }

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      main.style.transform = `translate(${mx - 7}px, ${my - 7}px)`;
    };
    window.addEventListener('mousemove', onMove);

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      positions.unshift({ x: mx, y: my });
      positions.pop();
      dots.forEach((d, i) => {
        const p = positions[i];
        d.style.transform = `translate(${p.x - 3}px, ${p.y - 3}px)`;
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onDown = () => { main.style.transform += ' scale(0.7)'; };
    const onUp = () => { main.style.transform = main.style.transform.replace(' scale(0.7)', ''); };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      container.remove();
    };
  }, []);

  return null;
}
