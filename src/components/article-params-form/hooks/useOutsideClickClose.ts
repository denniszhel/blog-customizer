import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onClose?: React.Dispatch<React.SetStateAction<boolean>>;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({isOpen, rootRef, onClose}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				isOpen && onClose?.(!isOpen);
			}
		}

		const handleClick = (e: MouseEvent) => {
			const { target } = e;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.(!isOpen);
			}
		}

		window.addEventListener('keydown', handleEscape);
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('keydown', handleEscape);
			window.removeEventListener('mousedown', handleClick);
		};

	}, [isOpen, onClose]);
};