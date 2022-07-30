import { AppUser } from './../type/index';
import { collection, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../config/firebase'
import {  Conversation } from '../type'
import { getRecipientEmail } from '../utils/getRecipientEmail'

export const useRecipient = (conversationUsers: Conversation['users']) => {
	const [loggedInUser, _loading, _error] = useAuthState(auth)

	//      lấy mail người nhận
	const recipientEmail = getRecipientEmail(conversationUsers, loggedInUser)

	// lấy ảnh người nhận
	const queryGetRecipient = query(
		collection(db, 'users'),
		where('email', '==', recipientEmail)
	)
	const [recipientsSnapshot, __loading, __error] =
		useCollection(queryGetRecipient)

    // // phần này làm theo không th
	const recipient = recipientsSnapshot?.docs[0]?.data() as AppUser | undefined

	return {
		recipient,
		recipientEmail
	}
}