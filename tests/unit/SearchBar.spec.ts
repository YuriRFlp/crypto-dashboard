import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '../../src/components/SearchBar.vue';

describe('SearchBar', () => {
	it('renders input and emits v-model', async () => {
		const wrapper = mount(SearchBar, {
			props: { modelValue: '' }
		});
		const input = wrapper.find('input');
		expect(input.exists()).toBe(true);
		await input.setValue('bitcoin');
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['bitcoin']);
	});
});
