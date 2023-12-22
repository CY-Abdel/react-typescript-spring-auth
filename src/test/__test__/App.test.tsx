// src/__ tests __/App.test.tsx

import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import { BrowserRouter } from 'react-router-dom';  // Ajoutez cette ligne
import App from "../../App"

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(
      <BrowserRouter>  
        <App />
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
})