import * as React from 'react';
import { Team } from '../../models/team';
import { Emote } from '../../models/emote';
import './style.scss';
export declare type PublicProps = {
    teams: Team[];
};
export declare class IndexPage extends React.Component<PublicProps> {
    state: {
        query: string;
        selectedEmotes: {};
    };
    handleSearch: (query: string) => void;
    filterEmotes: (query: string, emotes: Emote[]) => Emote[];
    handleSelectEmote: (teamName: string, emote: Emote, remove?: boolean | undefined) => void;
    render(): JSX.Element;
}
