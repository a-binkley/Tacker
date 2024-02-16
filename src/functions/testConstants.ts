export const rejection = { status: 429 };

export const apiResponseNOAA = {
	count: 2,
	units: null,
	stations: [
		{
			tidal: true,
			greatlakes: false,
			state: 'HI',
			timezone: 'HAST',
			timezonecorr: -10,
			id: '1611400',
			name: 'Nawiliwili',
			lat: 21.9544,
			lng: -159.3561
		},
		{
			tidal: true,
			greatlakes: false,
			state: 'HI',
			timezone: 'HAST',
			timezonecorr: -10,
			id: '1612340',
			name: 'Honolulu',
			lat: 21.303333,
			lng: -157.864528
		},
		{
			tidal: false,
			greatlakes: true,
			state: 'NY',
			timezone: 'EST',
			timezonecorr: -5,
			id: '8311030',
			name: 'Ogdensburg',
			lat: 44.697944,
			lng: -75.497722
		}
	]
};

export const mockRetrieveLocationDataArgs = {
	locs: ['1611400', '1612340', '8311030'],
	locMetadata: {
		'1611400': {
			city: 'foo1',
			state: 'bar1',
			coords: {
				lat: -12,
				lng: 34
			}
		},
		'1612340': {
			city: 'foo2',
			state: 'bar2',
			coords: {
				lat: -56,
				lng: 78
			}
		},
		'8311030': {
			city: 'foo3',
			state: 'bar3',
			coords: {
				lat: -910,
				lng: 11.12
			}
		}
	}
};
