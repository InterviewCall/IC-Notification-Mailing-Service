import { UniqueConstraintError } from 'sequelize';

import logger from '../configs/logger.config';
import MailContact from '../db/models/mailContact.model';
import MailContactDto from '../dtos/mailContact.dto';
import MailContactRepository from '../repositories/mailContact.repository';
import { ConflictError, InternalServerError } from '../utils/errors/app.error';

class MailContactService {
    public mailContactRepository;

    constructor(mailContactRepository: MailContactRepository) {
        this.mailContactRepository = mailContactRepository;
    }

    async create(data: MailContactDto): Promise<MailContact> {
        try {
            const contact = await this.mailContactRepository.create(data);
            return contact;
        } catch (error) {
            logger.error(error);

            if(error instanceof UniqueConstraintError) {
                throw new ConflictError(error.errors[0].message);
            }

            throw new InternalServerError('Something went wrong');
        }
    }
}

export default MailContactService;