import { displayArrow } from '../TableHeader';

describe('Display arrow function', () => {
  it('should return nothing if not selected', () => {
    const result = displayArrow(
      { sortBy: 'name', sortOrder: 'asc' },
      'winnings'
    );

    expect(result).toEqual();
  });

  it('should return down arrow if selected', () => {
    const result = displayArrow({ sortBy: 'name', sortOrder: 'asc' }, 'name');

    expect(result).toEqual(String.fromCharCode(0x2193));
  });
  it('should return up arrow if selected', () => {
    const result = displayArrow({ sortBy: 'name', sortOrder: 'desc' }, 'name');

    expect(result).toEqual(String.fromCharCode(0x2191));
  });
});
