import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BoardUser from '../../components/BoardUser';  // Assurez-vous de spécifier le bon chemin d'import
import * as userApi from '../../services/user.service';  // Importez le module des appels API
import EventBus from '../../common/EventBus';

// Mock EventBus to track calls
jest.mock('../../common/EventBus');

// Mock the module that contains API calls
jest.mock('../../services/user.service');

// Définir un type personnalisé pour l'erreur
interface CustomError extends Error {
  response?: {
    status?: number;
  };
}

describe('BoardUser Component', () => {
  it('renders user board content', async () => {
    
    // Mock the API response
    const mockResponse = { data: 'User board content' };
    (userApi.getUserBoard as jest.Mock).mockResolvedValueOnce(mockResponse);

    // Render the component
    render(<BoardUser />);

    // Wait for the API call to resolve and update the component
    await waitFor(() => {
      expect(userApi.getUserBoard).toHaveBeenCalled();
      expect(screen.getByText('User board content')).toBeInTheDocument();
    });

    // Ensure EventBus.dispatch is not called for success case
    expect(EventBus.dispatch).not.toHaveBeenCalled();
  });

  it('handles API error and triggers logout event', async () => {
    // Mock the API error response
    const errorMessage = 'Unauthorized';
    const mockError: CustomError = new Error(errorMessage);
    mockError.response = { status: 401 };
    (userApi.getUserBoard as jest.Mock).mockRejectedValueOnce(mockError);

    // Render the component
    render(<BoardUser />);

    // Wait for the API call to reject and update the component
    await waitFor(() => {
      expect(userApi.getUserBoard).toHaveBeenCalled();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Ensure EventBus.dispatch is called with 'logout' for error case
    expect(EventBus.dispatch).toHaveBeenCalledWith('logout');
  });
});
