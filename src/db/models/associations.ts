import MailContact from './MailContact';
import MailGroup from './MailGroup';
import MailGroupContact from './MailGroupContact';

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