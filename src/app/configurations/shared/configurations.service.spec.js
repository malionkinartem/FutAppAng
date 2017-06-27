"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var configurations_service_1 = require("./configurations.service");
describe('ConfigurationsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [configurations_service_1.ConfigurationsService]
        });
    });
    it('should be created', testing_1.inject([configurations_service_1.ConfigurationsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=configurations.service.spec.js.map