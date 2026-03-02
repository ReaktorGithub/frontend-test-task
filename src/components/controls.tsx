import styled from '@emotion/styled';

export const Button = styled.button<{ variant?: 'primary' | 'ghost' }>`
  border-radius: 999px;
  border: 1px solid transparent;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ variant }) => (variant === 'ghost' ? 'transparent' : '#4f46e5')};
  color: #e5e7eb;
  border-color: ${({ variant }) => (variant === 'ghost' ? '#374151' : 'transparent')};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition:
    background-color 0.16s ease,
    transform 0.08s ease,
    box-shadow 0.16s ease,
    border-color 0.16s ease;

  &:hover:not(:disabled) {
    background-color: ${({ variant }) => (variant === 'ghost' ? '#111827' : '#4338ca')};
    transform: translateY(-1px);
    box-shadow: 0 12px 30px rgba(79, 70, 229, 0.35);
    border-color: #4b5563;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
    box-shadow: none;
  }
`;

export const Input = styled.input`
  border-radius: 999px;
  border: 1px solid #374151;
  background-color: #020617;
  color: #e5e7eb;
  padding: 8px 12px;
  font-size: 14px;
  min-width: 0;

  &:focus-visible {
    outline: 2px solid #4f46e5;
    outline-offset: 1px;
  }
`;

export const Select = styled.select`
  border-radius: 999px;
  border: 1px solid #374151;
  background-color: #020617;
  color: #e5e7eb;
  padding: 8px 12px;
  font-size: 14px;

  &:focus-visible {
    outline: 2px solid #4f46e5;
    outline-offset: 1px;
  }
`;
