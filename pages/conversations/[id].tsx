import { doc, getDoc, getDocs } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import { auth, db } from '../../config/firebase'
import { Conversation, IMessage } from '../../type'
import {
	generateQueryGetMessages,
	transformMessage
} from '../../utils/getMessagesInConversation'
import { getRecipientEmail } from '../../utils/getRecipientEmail'

interface Props {
	conversation: Conversation
	messages: IMessage[]
}

const StyledContainer = styled.div`
	display: flex;
`

const StyledConversationContainer = styled.div`
	flex-grow: 1;
	overflow: scroll;
	height: 100vh;
	::-webkit-scrollbar {
		display: none;
	}
	
`

const Conversatio = ({ conversation, messages }: Props) => {
	const [loggedInUser, _loading, _error] = useAuthState(auth)
	return (
		<StyledContainer>
			<Head>
				<title>
					Đang nhắn với{' '}
					{getRecipientEmail(conversation.users, loggedInUser)}
				</title>
			</Head>

			<Sidebar />

			<StyledConversationContainer>
			<Screen conversation={conversation} messages={messages} />
			</StyledConversationContainer>
		</StyledContainer>
	)
}

export default Conversatio

export const getServerSideProps: GetServerSideProps<
	Props,
	{ id: string }
> = async context => {
	const conversationId = context.params?.id

	//truy vấn tên người gửi
	const conversationRef = doc(db, 'conversations', conversationId as string)
	const conversationSnapshot = await getDoc(conversationRef)

	//truy vấn tin nhắn
	const queryMessages = generateQueryGetMessages(conversationId)

	const messagesSnapshot = await getDocs(queryMessages)

	const messages = messagesSnapshot.docs.map(messageDoc =>
		transformMessage(messageDoc)
	)

	return {
		props: {
			conversation: conversationSnapshot.data() as Conversation,
			messages
		}
	}
}