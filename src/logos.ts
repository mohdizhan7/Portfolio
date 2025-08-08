import { asset } from "./asset";

export const logos = {
  itc:       asset('logos/itc.svg'),      // you also have itc.jpg; svg preferred
  pg:        asset('logos/pg.png'),       // you also have pg.jpg
  dtdc:      asset('logos/dtdc.jpg'),     // avif exists but jpg is safest
  edgistify: asset('logos/edgistify.png'),
  mindseed:  asset('logos/mindseed.png'), // we'll rename images.png -> mindseed.png
  stackbox:  asset('logos/stackbox.png'), // ensure this file exists
};

/* Covers: use logos as safe fallbacks so nothing shows blank.
   If/when you add real covers, switch to:
   asset('work/itc-cover.jpg') etc. */
export const covers = {
  itc:  logos.itc,
  pg:   logos.pg,
  dtdc: logos.dtdc,
};
