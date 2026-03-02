import styled from '@emotion/styled';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const TableHead = styled.th`
  text-align: left;
  padding: 10px 8px;
  color: #9ca3af;
  font-weight: 500;
  border-bottom: 1px solid #1f2937;
`;

export const TableData = styled.td`
  padding: 10px 8px;
  border-bottom: 1px solid #0f172a;
`;

export const TableRow = styled.tr<{ clickable?: boolean }>`
  &:hover {
    background-color: ${({ clickable }) => (clickable ? '#020617' : 'transparent')};
  }
`;
