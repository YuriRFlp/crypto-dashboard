import { render } from '@testing-library/vue';
import HeaderBar from '../../src/components/HeaderBar.vue';
import { describe, it, expect } from 'vitest';

describe('HeaderBar', () => {
  it('renders the dashboard title', () => {
    const { getByText } = render(HeaderBar);
    expect(getByText('Cripto')).toBeTruthy();
  });

  it('renders the theme toggle', () => {
    const { getAllByLabelText } = render(HeaderBar);
    expect(getAllByLabelText('Toggle theme').length).toBeGreaterThan(0);
  });
});
