"use client"
import React, { useEffect } from 'react';

const Editor = () => {
    useEffect(() => {
        const initializeEditor = async () => {
            if (typeof window !== 'undefined') {
                const EditorJS = (await import('@editorjs/editorjs')).default;

                try {
                    const editor = new EditorJS({
                        holder: 'editorjs',
                        placeholder: 'Article Description',
                        autofocus: true,
                        tools: {},
                        // data: {},
                        onReady: () => {
                            console.log("Editor.js is ready to work");
                        },
                    });

                    // Cleanup the editor instance when the component is unmounted
                    return () => {
                        editor.destroy();
                    };
                } catch (error) {
                    console.error('Error initializing EditorJS:', error.message);
                }
            }
        };

        // Call the initialization function
        initializeEditor();
    }, []); // Empty dependency array ensures that this effect runs only once

    return (
        <div>
            <div id='editorjs'></div>
        </div>
    );
};

export default Editor;
