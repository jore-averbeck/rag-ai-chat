export default function Header() {
    return (
      <header className="h-14 border-b flex items-center px-6 bg-background">
        <div className="flex items-center justify-between w-full">
          
          <h1 className="text-sm font-medium text-muted-foreground">
            RAG Chat Interface
          </h1>
          <div className="text-xs text-muted-foreground">
            Community RAG
          </div>
  
        </div>
      </header>
    );
  }