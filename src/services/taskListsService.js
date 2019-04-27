/* eslint-disable */

import {GapiClient} from "../helpers/gapi";

export const listTaskLists = (parameters = {}) => GapiClient().tasks.tasklists.list(parameters);
