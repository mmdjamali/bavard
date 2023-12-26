export default function viewport(element: HTMLElement, obj?: { enterViewport?: () => void, exitViewport?: () => void }) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                entry.isIntersecting ? obj?.enterViewport?.() : obj?.enterViewport?.();
            });
        }
    );

    observer.observe(element);

    return {
        destroy() {
            observer.unobserve(element);
            observer.disconnect()
        }
    }
}