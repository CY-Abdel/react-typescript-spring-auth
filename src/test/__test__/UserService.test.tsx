import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAdminBoard, getPublicContent } from '../../services/user.service';

describe('user-service component', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should get public content", async () => {
    const mockResponse = 'contenu public';
    mock.onGet('http://localhost:8085/api/test/all').reply(200, mockResponse);

    const result = await getPublicContent();

    expect(result.data).toEqual(mockResponse);
  });

  it("should get admin content", async () => {
    const mockResponse = 'contenu admin';
    mock.onGet('http://localhost:8085/api/test/admin').reply(200, mockResponse);

    const result = await getAdminBoard();

    expect(result.data).toEqual(mockResponse);
  });
});
