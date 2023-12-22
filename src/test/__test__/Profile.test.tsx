import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Profile from '../../components/Profile';
// import { getCurrentUser } from '../../services/auth.service';

jest.mock('../../services/auth.service', () => ({
  ...jest.requireActual('../../services/auth.service'),
  getCurrentUser: jest.fn(() => ({
    username: 'testUser',
    accessToken: 'testAccessTokenTestAccessToke',
    id: 1,
    email: 'test@example.com',
    roles: ['ROLE_USER'],
  })),
}));

describe('Profile Component', () => {
  it('renders user profile information', () => {
    render(<Profile />);
    console.log(screen.debug());

    expect(screen.getByRole('heading', { name: /testUser Profile/ })).toBeInTheDocument();

    // Utilisez une chaîne partielle pour la recherche du texte du token
    // expect(screen.getByText('Token: testAccessToken')).toBeInTheDocument();
    expect(screen.getByText('Token:')).toBeInTheDocument();
    expect(screen.getByText(/.*AccessToke/)).toBeInTheDocument();

    // expect(screen.getByText('Id: 1')).toBeInTheDocument();
    expect(screen.getByText('Id:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    console.log(/Email: test@example.com/i.test('Email: test@example.com')); // devrait imprimer true

    expect(screen.getByText('Roles:')).toBeInTheDocument();
    expect(screen.getByText('ROLE_USER')).toBeInTheDocument();
  });

});
