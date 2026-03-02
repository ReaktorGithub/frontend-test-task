import styled from '@emotion/styled';

export const Page = styled.div`
  min-height: 100vh;
  background-color: #0f172a;
  color: #e5e7eb;
  padding: 24px;
  display: flex;
  justify-content: center;
`;

export const PageContent = styled.div`
  width: 100%;
  max-width: 1120px;
`;

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

export const Card = styled.section`
  background-color: #020617;
  border-radius: 16px;
  padding: 20px 24px;
  border: 1px solid #1f2937;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.75);
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;

export const CardSubtitle = styled.p`
  font-size: 13px;
  color: #9ca3af;
`;

export const CardFooter = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  align-items: center;
`;
