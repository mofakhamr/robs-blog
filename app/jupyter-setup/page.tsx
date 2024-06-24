

export default function Page() {
  return (
    <div className="lg:mx-32 lg mt-5 rounded-lg p-4 sm:p-10 bg-white dark:bg-gray-950">
      <p className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Setting up Jupyter notebook on VS Code
      </p>

      <p>My experience with Python is quite minimal, I've never really had much need to do anything except tinker around with it.</p>
      <p>I've previously setup a python jupyter notebook Docker container at work, it grabbed some data, applied some transformations and saved the output elsewhere, just as an
         example</p>
      <p>I wanted to create a pipeline that's used in an application, it's nothing difficult but I think it's a good first project. The general idea is:</p>
      <ul>
        <li>Grab data from somewhere</li>
        <li>Transform it into something useful</li>
        <li>Save it somewhere accessible to my webpage</li>
        <li>Use a charting library for visual snazzyness</li>
      </ul>
      <p>I've never really been a python dev but as an experienced developer, I was quietly confident I could achieve it.
        Originally, I was a PHP dev and now I do some Javascript/React because doesn't everyone?
      </p>
      <p>It's worth mentioning that I'm breaking a lifetime of hard opinions on which Operating System to work on - For leisure I use Windows (best for gaming) and I have
         always used Linux for programming/work, generally I dual boot.</p>
      <p>I have however, gotten into WSL2 - Windows Subsystem for Linux and I have to say, it's really good - I get all the linux power but with the simplicity of a Windows
        interface.</p>
      <p>So, here's the steps I took to setup my Jupyter notebook on Windows WSL2 and VS Code.</p>
      <ul>
        <li>First, you need to install WSL2 if you haven't already - there's plenty of great articles out there.</li>
        <li>Next, install python3, pip in WSL2</li>
        <li>Then, install Jupyter in pip</li>
        <li>Run Jupyter from the command line</li>
        <li>Install the VS Code extension for Python/Jupyter</li>
        <li>Connect VS Code to Jupyter - using the token url in terminal</li>
      </ul>
    </div>
  );
}
