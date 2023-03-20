import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'
import ListItems from '../ListItems'

class InputItems extends Component {
  state = {
    isShowed: false,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordList: [],
    searchInput: '',
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  checkBoxClicked = () => {
    this.setState(prevState => ({
      isShowed: !prevState.isShowed,
    }))
  }

  onDeleteTransactionHistory = id => {
    const {passwordList} = this.state
    const filteredPasswordList = passwordList.filter(each => each.id !== id)

    this.setState({passwordList: filteredPasswordList})
    return filteredPasswordList
  }

  addPasswordList = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    const newPasswordList = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPasswordList],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  render() {
    const {
      isShowed,
      passwordList,
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
    } = this.state

    const searchResults = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput),
    )

    return (
      <>
        <div className="input-container">
          <form className="inputs-container" onSubmit={this.addPasswordList}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-icon-container">
              <img
                className="icons"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                onChange={this.onChangeWebsiteInput}
                value={websiteInput}
                placeholder="Enter Website"
                className="input"
                type="text"
              />
            </div>
            <div className="input-icon-container">
              <img
                className="icons"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                onChange={this.onChangeUsernameInput}
                value={usernameInput}
                placeholder="Enter Username"
                className="input"
                type="text"
              />
            </div>
            <div className="input-icon-container">
              <img
                className="icons"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                onChange={this.onChangePasswordInput}
                value={passwordInput}
                placeholder="Enter Password"
                className="input"
                type="password"
              />
            </div>
            <div className="button-container">
              <button data-testid="delete" className="button" type="submit">
                Add
              </button>
            </div>
          </form>
          <img
            className="password-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>

        <div className="list-container">
          <div className="password-count-container">
            <div className="pass-count">
              <h1 className="your-password">Your Passwords</h1>
              <p className="count">{searchResults.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="icons"
                alt="search"
              />
              <input
                value={this.searchInput}
                onChange={this.onSearch}
                className="input"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
          <hr />
          <div className="button-container">
            <input
              onClick={this.checkBoxClicked}
              id="checkBox"
              type="checkbox"
            />
            <label htmlFor="checkBox">Show passwords</label>
          </div>
          {passwordList.length > 0 && searchResults.length > 0 ? (
            <ul className="list-items">
              {searchResults.map(each => (
                <ListItems
                  isShowed={isShowed}
                  addPasswordLists={each}
                  key={each.id}
                  onDeleteTransactionHistory={this.onDeleteTransactionHistory}
                />
              ))}
            </ul>
          ) : (
            <div className="no-password-image">
              <img
                className="password-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="your-password">No Passwords</p>
            </div>
          )}
        </div>
      </>
    )
  }
}
export default InputItems
