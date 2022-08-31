import { MENU_STATUSES } from '../../constants';
import {
  handleResetClick,
  handleResetCancel,
  handleResetConfirmClick,
  handleStartClick,
  handleClickPrev,
  handleClickNext,
} from '../../helpers/menuLogic';

describe('handleResetClick', () => {
  const mocks = {
    setShowResetConfirm: jest.fn(),
  };
  it('calls setShowResetConfirm() when invoked', () => {
    handleResetClick(mocks.setShowResetConfirm);
    expect(mocks.setShowResetConfirm).toHaveBeenCalled();
  });
});

describe('handleResetCancel', () => {
  const mocks = {
    setShowResetConfirm: jest.fn(),
  };
  it('calls setShowResetConfirm() when invoked', () => {
    handleResetCancel(mocks.setShowResetConfirm);
    expect(mocks.setShowResetConfirm).toHaveBeenCalled();
  });
});

describe('handleResetConfirmClick', () => {
  const mocks = {
    setShowResetConfirm: jest.fn(),
    handleResetGameData: jest.fn(),
  };
  it('calls setShowResetConfirm() and handleResetGameData() when invoked', () => {
    handleResetConfirmClick(mocks.setShowResetConfirm, mocks.handleResetGameData);
    expect(mocks.setShowResetConfirm).toHaveBeenCalled();
    expect(mocks.handleResetGameData).toHaveBeenCalled();
  });
});

describe('handleStartClick', () => {
  jest.useFakeTimers();
  const mocks = {
    setMenuStatus: jest.fn(),
  };
  it('calls setMenuStatus() when invoked', async () => {
    await handleStartClick(mocks.setMenuStatus);
    jest.runAllTimers();
    expect(mocks.setMenuStatus).toHaveBeenCalled();
  });
});

describe('handleClickPrev', () => {
  jest.useFakeTimers();
  const mocks = {
    setMenuStatus: jest.fn(),
  };
  it('calls setMenuStatus() when invoked from PICK_SIDE', async () => {
    await handleClickPrev(MENU_STATUSES.PICK_SIDE, mocks.setMenuStatus);
    jest.runAllTimers();
    expect(mocks.setMenuStatus).toHaveBeenCalled();
  });
  it('calls setMenuStatus() when invoked from PICK_AI', async () => {
    await handleClickPrev(MENU_STATUSES.PICK_AI, mocks.setMenuStatus);
    jest.runAllTimers();
    expect(mocks.setMenuStatus).toHaveBeenCalled();
  });
});

describe('handleClickNext', () => {
  jest.useFakeTimers();
  const mocks = {
    setMenuStatus: jest.fn(),
  };
  it('calls setMenuStatus() when invoked from PICK_SIDE', async () => {
    await handleClickNext(MENU_STATUSES.PICK_SIDE, mocks.setMenuStatus);
    jest.runAllTimers();
    expect(mocks.setMenuStatus).toHaveBeenCalled();
  });
  it('does NOT call setMenuStatus() when invoked from PICK_AI', async () => {
    await handleClickNext(MENU_STATUSES.PICK_AI, mocks.setMenuStatus);
    jest.runAllTimers();
    expect(mocks.setMenuStatus).not.toHaveBeenCalled();
  });
});
