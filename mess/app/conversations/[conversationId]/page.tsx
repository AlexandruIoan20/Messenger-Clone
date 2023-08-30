interface IParams { 
    conversationId: string 
}; 

const ConversationId = async( { params }: { params: IParams }) => { 
    return( 
        <div>
            ConversationID!
        </div>
    )
}; 

export default ConversationId; 