import { useDispatch, useSelector } from 'react-redux';

// Typed hooks for TypeScript-like experience
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

