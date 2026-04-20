import Domain from '../db/models/domain.model';
import BaseRepository from './base.repository';

class DomainRepository extends BaseRepository<Domain> {
    constructor() {
        super(Domain);
    }
}

export default DomainRepository;