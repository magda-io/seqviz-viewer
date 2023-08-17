import React, { useState } from "react";
import { SeqViz } from "seqviz";
import { Selection } from "seqviz/dist/selectionContext";
import "./global.css";
interface SEQVIZ_VIWER_DataType {
    seq?: string;
    name?: string;
}

declare global {
    interface Window {
        __SEQVIZ_VIWER__: SEQVIZ_VIWER_DataType;
    }
}

interface TranslationType {
    direction?: number;
    end: number;
    start: number;
}

const getViwerParentData = (key: keyof SEQVIZ_VIWER_DataType) => window?.parent?.__SEQVIZ_VIWER__?.[key];

function App() {
    const [seqSelection, setSeqSelection] = useState<Selection | null>(null);
    let translations: TranslationType[] = [];
    if (seqSelection?.start && seqSelection?.end) {
        if (seqSelection.clockwise === true) {
            const { start, end } = seqSelection;
            translations = [
                {
                    start,
                    end,
                    direction: 1,
                },
            ];
        } else {
            const { start, end } = seqSelection;
            translations = [
                {
                    start: end,
                    end: start,
                    direction: -1,
                },
            ];
        }
    }

    return (
        <div id="seqviewer">
            <SeqViz
                name={getViwerParentData("name") ? getViwerParentData("name") : "Untitled"}
                seq={getViwerParentData("seq") ? getViwerParentData("seq") : ""}
                translations={translations}
                enzymes={[]}
                onSelection={(sel) => setSeqSelection(sel)}
            />
        </div>
    );
}

export default App;
