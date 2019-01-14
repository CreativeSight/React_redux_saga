import { call, put, takeEvery} from 'redux-saga/effects'
import { currentFetchData, fetchUserSuccess, fetchDataFail, fetchAllSuccess } from './actions'

//Saga's responsible for fetching "Select all" data
export function* watchAllData() {
  yield takeEvery('FETCH_ALL', fetchDataAsync);
}

function* fetchDataAsync(action) {
  try {
    yield put(currentFetchData());
    const data = yield call(() => {
      return fetch('http://developersgym.pl/rest/stats.php')
              .then(res => res.json())
      }
    );
    yield put(fetchAllSuccess(data, action.id));
  } catch (error) {
    yield put(fetchDataFail());
  }
}

//Saga's responsible for fetching users data

export function* watchUsersData() {
  yield takeEvery('FETCH_USERS_STATS', fetchUsersAsync);
}

function* fetchUsersAsync(action) {
  try {
    yield put(currentFetchData());
    const data = yield call(() => {
      return fetch(`http://developersgym.pl/rest/stats.php?author=${action.url}`)
              .then(res => res.json())
              
      }
    );
    yield put(fetchUserSuccess(data, action.id));
  } catch (error) {
    yield put(fetchDataFail());
  }
}

