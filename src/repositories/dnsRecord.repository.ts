import DnsRecord from '../db/models/dnsRecord.model';
import BaseRepository from './base.repository';

class DnsRecordRepository extends BaseRepository<DnsRecord> {
    constructor() {
        super(DnsRecord);
    }
}

export default DnsRecordRepository;