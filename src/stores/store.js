import Customer from '../stores/customer'
import MatchStore from '../stores/matchstore'
import ManagerStore from '../stores/managerstore'
import MessageStore from '../stores/messagestore'
import ManagerProfile from '../stores/manager/managerprofile'
import ManagerLoan from '../stores/manager/managerloan'
import ManagerMessage from '../stores/manager/managermessage'
import LoanStore from '../stores/loanstore'
import { observable, action, computed } from 'mobx'
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

class Config {
    @observable loading = []

    @observable message = "";
    @observable messageInterval = null;
    @observable messageType = 'warning';
    @observable registrationId = "";
    @observable redirectPage = null;
    @observable appState = null;

    @action changeLoading(isLoading) {
        if (isLoading) {
            this.loading.push(1);
        } else {
            this.loading.splice(0, 1);
        }
    }

    @action setMessage(message, errorType) {
        if (this.message !== '' && this.messageInterval != null) {
            clearTimeout(this.messageInterval);
            this.messageInterval = null;
        }
        this.message = message;
        if (errorType !== undefined && errorType !== null) {
            this.messageType = errorType;
        }
        if (this.message === '') {
            clearTimeout(this.messageInterval);
            this.messageInterval = null;
        }
    }

    @action setMessageInterval(interval) {
        this.messageInterval = interval;
    }

    @action setRegistrationId(registrationId) {
        this.registrationId = registrationId;
    }
    @action setRedirect(options) {
        this.redirectPage = options;
    }
    @action setAppState(state) {
        this.appState = state;
    }

    @computed get percentage() {
        return width / 750;
    }
}
const config = new Config();
const stores = {
    customer: Customer,
    config: config,
    match: MatchStore,
    manager: ManagerStore,
    message: MessageStore,
    m_profile: ManagerProfile,
    m_message: ManagerMessage,
    m_loan: ManagerLoan,
    loans: LoanStore
}

export default stores