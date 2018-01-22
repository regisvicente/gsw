import { TestBed, async, inject } from '@angular/core/testing';

import { BancoGuard } from './banco.guard';

describe('MobileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BancoGuard]
    });
  });

  it('should ...', inject([BancoGuard], (guard: BancoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
