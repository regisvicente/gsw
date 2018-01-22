import { TestBed, inject } from '@angular/core/testing';

import { PadraoService } from './padrao.service';

describe('PadraoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PadraoService]
    });
  });

  it('should be created', inject([PadraoService], (service: PadraoService) => {
    expect(service).toBeTruthy();
  }));
});
