from retrieval.search import search
from retrieval.context_builder import build_context

from rag.answer import generate_answer
from rag.answer import stream_answer


class RAGEngine:
    def __init__(self):
        pass

   
    def query(self, question: str) -> dict:

        # 1. Retrieve
        results = search(question)

        # 2. Build context
        context = build_context(results)

        # 3. Generate answer
        answer = generate_answer(question, context)

        return {
            "question": question,
            "answer": answer,
            "context": context,
            "sources": results,
        }

    
    def stream_query(self, question: str):

        # 1. Retrieve
        results = search(question)

        # 2. Build context
        context = build_context(results)

        # 3. Stream answer
        for chunk in stream_answer(question, context):
            yield chunk