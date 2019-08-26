import { observable, action, computed } from 'mobx'
import { CustomerProfile } from '../mocks/api';

class Customer {
    @observable profile = {
        firstName: '',
        lastName: '',
        name: '',
        email: '',
        avatar: '',
        matchMe: false,
        phone: '',
        identity: '',
        identityType:'',
        gender: '',
        genderType:'',
        loanType:'',
        salaryFrom:'',
        region:'',
        RegionName:'',
        createdOn: '',
        genderList:[],
        identityTypeList:[]
    }

    @observable requireSource = {
        Areas: [],
        Languages: [],
        Avatars: []
    }

    @action setSource(areas, languages, avatars) {
        this.requireSource.Areas = areas;
        this.requireSource.Languages = languages;
        this.requireSource.Avatars = avatars;
    }

    @action changeProfile(data) {
        var obj = Object.assign({}, this.profile, data);
        this.profile = obj;
    }
}

export default new Customer()