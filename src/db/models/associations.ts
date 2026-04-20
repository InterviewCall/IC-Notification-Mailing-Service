import DnsRecord from './dnsRecord.model';
import Domain from './domain.model';
import MailContact from './mailContact.model';
import MailGroup from './mailGroup.model';
import MailGroupContact from './mailGroupContact.model';

MailGroup.belongsToMany(MailContact, {
    through: MailGroupContact,
    foreignKey: 'groupId',
    otherKey: 'contactId',
    as: 'contacts'
});

MailContact.belongsToMany(MailGroup, {
    through: MailGroupContact,
    foreignKey: 'contactId',
    otherKey: 'groupId',
    as: 'groups'
});

Domain.hasMany(DnsRecord, {
    foreignKey: 'domainId',
    as: 'dnsRecords'
});

DnsRecord.belongsTo(Domain, {
    foreignKey: 'domainId',
    as: 'domain',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});