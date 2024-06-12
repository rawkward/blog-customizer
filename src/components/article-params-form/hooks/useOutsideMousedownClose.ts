import { useEffect } from 'react';

type UseOutsideMousedownClose = {
	isMenuOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideMousedownClose = ({
	isMenuOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideMousedownClose) => {
	useEffect(() => {
		const handleMousedown = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isMenuOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener('mousedown', handleMousedown);

		return () => {
			window.removeEventListener('mousedown', handleMousedown);
		};
	}, [onClose, onChange, isMenuOpen]);
};
