import React, { useContext } from 'react';
import { AuthContext } from '../../../services/authenticationContext';
import * as Styles from './styles';
import * as AppConfig from '../../../AppConfig';
import { Tooltip } from '@mui/material';

export interface ChatEntryProps {
    id: string;
    name: string;
    message: string;
    date?: Date;
};

export const ChatEntry = (props: ChatEntryProps): JSX.Element => {
    const authContext = useContext(AuthContext);
    const isCurrentUser = authContext?.currentUser?.id === props.id;


    return (
        <>
            {
                isCurrentUser ?
                    <>
                        <Styles.OtherUserChatEntryNameContainer>
                            <Styles.OtherUserChatEntryName>{props.name}</Styles.OtherUserChatEntryName>
                        </Styles.OtherUserChatEntryNameContainer>
                        <Styles.ChatEntryContainer isCurrentUser={isCurrentUser}>
                            <Styles.ChatEntryContent isCurrentUser={isCurrentUser}>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt dolor delectus, quas sit iusto soluta facilis mollitia error eos earum ipsam possimus, distinctio eveniet amet repellat accusamus corrupti dolore tenetur!
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt dolor delectus, quas sit iusto soluta facilis mollitia error eos earum ipsam possimus, distinctio eveniet amet repellat accusamus corrupti dolore tenetur!
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt dolor delectus, quas sit iusto soluta facilis mollitia error eos earum ipsam possimus, distinctio eveniet amet repellat accusamus corrupti dolore tenetur!
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt dolor delectus, quas sit iusto soluta facilis mollitia error eos earum ipsam possimus, distinctio eveniet amet repellat accusamus corrupti dolore tenetur!
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt dolor delectus, quas sit iusto soluta facilis mollitia error eos earum ipsam possimus, distinctio eveniet amet repellat accusamus corrupti dolore tenetur!
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt dolor delectus, quas sit iusto soluta facilis mollitia error eos earum ipsam possimus, distinctio eveniet amet repellat accusamus corrupti dolore tenetur!
                            </Styles.ChatEntryContent>
                            <Tooltip arrow={true} placement='right' title={props.date?.toUTCString()}>
                                <Styles.ChatEntryImage src={`${AppConfig.GetConfig().apiUrl}Users/${props.id}/image`} />
                            </Tooltip>
                        </Styles.ChatEntryContainer>
                    </>
                    :
                    <>
                        <Styles.CurrentUserChatEntryName>{props.name}</Styles.CurrentUserChatEntryName>
                        <Styles.ChatEntryContainer isCurrentUser={isCurrentUser}>
                            <Tooltip arrow={true} placement='left' title={props.date?.toUTCString()}>
                                <Styles.ChatEntryImage src={`${AppConfig.GetConfig().apiUrl}Users/${props.id}/image`} />
                            </Tooltip>
                            <Styles.ChatEntryContent isCurrentUser={isCurrentUser}>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt dolor delectus, quas sit iusto soluta facilis mollitia error eos earum ipsam possimus, distinctio eveniet amet repellat accusamus corrupti dolore tenetur!
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt dolor delectus, quas sit iusto soluta facilis mollitia error eos earum ipsam possimus, distinctio eveniet amet repellat accusamus corrupti dolore tenetur!
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt dolor delectus, quas sit iusto soluta facilis mollitia error eos earum ipsam possimus, distinctio eveniet amet repellat accusamus corrupti dolore tenetur!
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt dolor delectus, quas sit iusto soluta facilis mollitia error eos earum ipsam possimus, distinctio eveniet amet repellat accusamus corrupti dolore tenetur!
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt dolor delectus, quas sit iusto soluta facilis mollitia error eos earum ipsam possimus, distinctio eveniet amet repellat accusamus corrupti dolore tenetur!
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt dolor delectus, quas sit iusto soluta facilis mollitia error eos earum ipsam possimus, distinctio eveniet amet repellat accusamus corrupti dolore tenetur!
                            </Styles.ChatEntryContent>
                        </Styles.ChatEntryContainer>
                    </>

            }
        </>
    )
};