import os
os.environ["UNSTRUCTURED_NO_IMAGES"] = "true"

from unstructured.partition.pdf import partition_pdf


def extract_elements_from_pdf(path: str):
    elements = partition_pdf(
        filename=path,
        strategy="fast"
    )

    return [
        {"text": el.text, "type": el.category}
        for el in elements
        if hasattr(el, "text")
    ]