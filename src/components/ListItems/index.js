import './index.css'

const ListItems = props => {
  const {addPasswordLists, onDeleteTransactionHistory, isShowed} = props

  const {id, website, username, password} = addPasswordLists
  const profileInitial = website[0].toUpperCase()

  const onDelete = () => {
    onDeleteTransactionHistory(id)
  }

  return (
    <li className="list-item">
      <div className="password-initial-container">
        <div className="initial-container">
          <p>{profileInitial}</p>
        </div>
        <div>
          <p className="website">{website}</p>
          <p className="username">{username}</p>
          {isShowed ? (
            <p className="password">{password}</p>
          ) : (
            <img
              className="star-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
      </div>
      <button onClick={onDelete} className="delete-button" type="button">
        <img
          className="icons"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default ListItems
