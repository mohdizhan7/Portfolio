import { asset } from "./asset";

export const logos = {
  itc:       asset('logos/itc.svg'),      // keep svg you already have
  pg:        asset('logos/pg.png'),
  edgistify: asset('logos/edgistify.png'),
  mindseed:  asset('logos/mindseed.png'),
  stackbox:  asset('logos/stackbox.png'), // <- normalized above
  dtdc:      asset('logos/dtdc.png'),     // <- normalized above
};

export const covers = {
  itc:  asset('work/itc-cover.jpg'),
  pg:   asset('work/pg-cover.jpg'),
  dtdc: asset('work/dtdc-cover.jpg'),
};
