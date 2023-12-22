// login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

import Login from '../../components/Login';
import * as authService from '../../services/auth.service';

// Mock the auth service
jest.mock('../../services/auth.service');

describe('Login Component', () => { //describe est une fonction de Jest qui permet de regrouper plusieurs tests liés sous une même suite de tests.

  // Avant tous les tests dans le fichier
  beforeAll(() => {
    // Créer un objet global avec la propriété reload modifiable
    Object.defineProperty(global, 'location', {
      value: {
        reload: jest.fn(),
      },
      writable: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks(); // les fonctions mockées seront réinitialisés.
  });

  it('renders the login form', async () => { // Elle est utilisée pour définir un test individuel ou une spécification. //'renders the login form' décrit ce que le test vérifiera.
    render(
      //render crée une représentation virtuelle du composant que vous pouvez ensuite interroger et manipuler pour vérifier son comportement.
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('submits the login form with valid data', async () => {
    const mockLoginResponse = { accessToken: 'mockAccessToken' };
    (authService.login as jest.Mock).mockResolvedValue(mockLoginResponse);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'testPassword' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    });

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('testUser', 'testPassword');
    });

    // Mock window.location.reload()
    window.location.reload = jest.fn();
  });

  it('handles login error and displays error message', async () => {
    const errorMessage = 'Invalid credentials';
    (authService.login as jest.Mock).mockRejectedValue({ message: errorMessage });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'invalidPassword' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});

