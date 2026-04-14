import Domain from './domain.model';
import MailContact from './mailContact.model';
import MailGroup from './mailGroup.model';
import MailGroupContact from './mailGroupContact.model';
import Sender from './sender.model';

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

Domain.hasMany(Sender, {
    foreignKey: 'domainId',
    as: 'senders'
});

Sender.belongsTo(Domain, {
    foreignKey: 'domainId',
    as: 'domain',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});