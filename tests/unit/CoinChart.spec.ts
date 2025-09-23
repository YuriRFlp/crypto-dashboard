import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CoinChart from '../../src/components/CoinChart.vue';

vi.mock('vue3-apexcharts', () => ({
  default: {
    name: 'VueApexCharts',
    render: () => null,
  },
}));

const sampleData = [
  { x: new Date('2023-01-01'), y: 100 },
  { x: new Date('2023-01-02'), y: 110 },
  { x: new Date('2023-01-03'), y: 120 },
];

describe('CoinChart', () => {
  it('renders chart component', () => {
    const wrapper = mount(CoinChart, {
      props: { data: sampleData }
    });
    expect(wrapper.findComponent({ name: 'VueApexCharts' }).exists()).toBe(true);
  });
});