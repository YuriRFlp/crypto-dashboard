import { render } from '@testing-library/vue';
import CoinTable from '../../src/components/CoinTable.vue';
import { describe, it, expect } from 'vitest';

const coins = [
  {
    id: 'btc',
    symbol: 'btc',
    name: 'Bitcoin',
    image: '',
    current_price: 100,
    low_24h: 90,
    high_24h: 110,
    market_cap: 1000000,
    market_cap_rank: 1,
    price_change_percentage_24h: 2.5,
    total_volume: 50000,
    market_cap_change_percentage_24h: 1.2,
    roi: 0.5,
  },
];
const columns = [
  { key: 'rank', prop: 'market_cap_rank', label: 'Rank', width: '80', align: 'left' as const },
  { key: 'name', label: 'Name', minWidth: '160', slot: 'name' },
  { key: 'price', label: 'Price', minWidth: '120', slot: 'price' },
  { key: 'change', label: '24h', minWidth: '100', slot: 'change' },
  { key: 'marketCap', label: 'Market Cap', minWidth: '140', slot: 'marketCap' },
];

describe('CoinTable', () => {
  it('renders the table', () => {
    const { container } = render(CoinTable, {
      props: {
        coins,
        columns,
        pageSize: 10,
        currentPage: 1,
        total: 1,
        isFavorite: () => false,
      },
    });

    expect(container.querySelector('.el-table')).toBeTruthy();
  });
});