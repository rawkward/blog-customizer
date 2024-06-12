import { useEffect } from 'react';

type UseOutsideMousedownClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideMousedownClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideMousedownClose) => {
	useEffect(() => {
		const handleMousedown = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener('mousedown', handleMousedown);

		return () => {
			window.removeEventListener('mousedown', handleMousedown);
		};
	}, [onClose, onChange, isOpen]);
};
