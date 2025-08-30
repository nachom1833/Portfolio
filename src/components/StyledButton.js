import styled from 'styled-components';

export const StyledButton = styled.a`
  display: inline-block;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  // Base styles for both themes
  color: #212121;
  border: none;
  background-color: transparent;

  // Primary button style
  ${props => props.primary && `
    background-color: #40e0d0; // Mint green
    color: #212121;
    &:hover {
      background-color: #36c6b8;
    }
  `}

  // Secondary button style
  ${props => props.secondary && `
    background-color: transparent;
    color: #40e0d0;
    border: 2px solid #40e0d0;
    
    &:hover {
      background-color: #40e0d0;
      color: #212121;
    }
  `}

  // Accessibility and focus state
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(64, 224, 208, 0.5);
  }
`;