import logger from '../configs/logger.config';
import MailGroupContactDto from '../dtos/mailGroupContact.dto';
import MailGroupContactRepository from '../repositories/mailGroupContact.repository';
import { InternalServerError } from '../utils/errors/app.error';

class MailGroupContactService {
    private mailGroupContactRepository;

    constructor(mailGroupContactRepository: MailGroupContactRepository) {
        this.mailGroupContactRepository = mailGroupContactRepository;
    }

    async createGroupWithContact(data: MailGroupContactDto) {
        try {
            await this.mailGroupContactRepository.create(data);
        } catch (error) {
            logger.error(error);
            throw new InternalServerError('Something went wrong');
        }
    }
}

export default MailGroupContactService;